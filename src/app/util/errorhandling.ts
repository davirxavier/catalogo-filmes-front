import {HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {delay, map, retryWhen, take, takeUntil} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../../environments/environment';

const waitForRetryDelay = environment.waitForRetryDelay;
const retryTimes = environment.retryTimes;
const connectionErrorPage = environment.connectionErrorPage;
const connectionErrorKey = 'error.connection_error';
const connectionErrorRetryKey = 'error.connection_error_retry';

export function error400AsString(response: HttpErrorResponse, invalidString: string): string
{
  const error = response.error;
  const errorArr = error.errors;

  if (errorArr && Array.isArray(errorArr))
  {
    let ret = '';

    errorArr.forEach(value =>
    {
      if (value.field)
      {
        ret = ret + '- ' + (value.field as string).toUpperCase() + ' ' + invalidString + ': ' + value.defaultMessage + '<br>';
      }
      else
      {
        ret = ret + '- ' + value.defaultMessage + '<br>';
      }
    });

    return ret;
  }

  return '';
}

export function handle400Error(obs: Observable<any>, translate: TranslateService, toastr: ToastrService): void
{
  obs.subscribe(() => {}, err =>
  {
    console.error(err);
    const errorstr = error400AsString(err, translate.instant('error.invalid'));
    toastr.error(errorstr, translate.instant('error.error'), { enableHtml: true });
  });
}

export function handleConnectionError(obs: Observable<any>,
                                      translate: TranslateService,
                                      toastr: ToastrService,
                                      router: Router,
                                      retry: boolean = true,
                                      navigateToOnEnd: string = 'filmes',
                                      redirectOnError: boolean = true): void
{
  const stop = new Subject();

  obs.pipe(take(1), retryWhen(errors =>
  {
    errors.subscribe(err =>
    {
      if (err.status === undefined || err.status === null || err.status !== 0)
      {
        return;
      }

      toastr.error(translate.instant(connectionErrorRetryKey),
        translate.instant(connectionErrorKey));
    });

    let retries = 0;
    return errors.pipe(delay(waitForRetryDelay), takeUntil(stop), map(err =>
    {
      if (err.status === undefined || err.status === null || err.status !== 0)
      {
        throw err;
      }

      retries++;
      if (retries >= retryTimes || retry === false)
      {
        throw err;
      }
      return err;
    }));
  })).subscribe(() => {}, err =>
  {
    console.error(err);
    if (err.status !== undefined && err.status !== null && err.status === 0 && redirectOnError)
    {
      router.navigate([connectionErrorPage, navigateToOnEnd]);
      toastr.clear();
    }
  });

  router.events.subscribe(event =>
  {
    if (event instanceof NavigationEnd)
    {
      stop.next();
    }
  });
}
