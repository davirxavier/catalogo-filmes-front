import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export function sanitizeImage(image: string, sanitizer: DomSanitizer): SafeUrl
{
  const prefix = 'data:image;base64,';
  let parsedImg = image;

  if (!parsedImg.startsWith(prefix))
  {
    parsedImg = prefix + parsedImg;
  }
  return sanitizer.bypassSecurityTrustUrl(parsedImg);
}
