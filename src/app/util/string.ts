import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {duration} from 'moment';
import {environment} from '../../environments/environment';

export function isStringEmpty(str: string): boolean
{
  return !str || (str && str.length === 0);
}

export function stringComparatorUppercase(s1: string, s2: string): number
{
  return (s1.toUpperCase() > s2.toUpperCase()) ? 1 : -1;
}

export function stringComparatorUppercaseReversed(s1: string, s2: string): number
{
  return (s1.toUpperCase() > s2.toUpperCase()) ? -1 : 1;
}

export function getDateDay(date: string, translate: TranslateService): string
{
  const mom = moment(date);
  mom.locale(translate.currentLang);
  return mom.format('DD');
}

export function getDateMonthName(date: string, translate: TranslateService): string
{
  const mom = moment(date);
  mom.locale(translate.currentLang);
  return mom.format('MMMM');
}

export function getDateMonth(date: string, translate: TranslateService): string
{
  const mom = moment(date);
  mom.locale(translate.currentLang);
  return mom.format('MM');
}

export function getDateYear(date: string, translate: TranslateService): string
{
  const mom = moment(date);
  mom.locale(translate.currentLang);
  return mom.format('yyyy');
}

export function getDateFormattedForDB(mom: moment.Moment): string
{
  return mom.format(environment.dbDateFormat);
}

export function getDateFromDBString(str: string): moment.Moment
{
  return moment(str, environment.dbDateFormat);
}

export function getDurationFormatted(durationString: string): string
{
  const dur = duration(durationString);

  let ret = dur.asMinutes();
  let retSuffix = 'm';

  if (!isInteger(ret))
  {
    ret = dur.asSeconds();
    retSuffix = 's';
  }

  return ret + retSuffix;
}

function isInteger(num: number): boolean
{
  return num % 1 === 0;
}
