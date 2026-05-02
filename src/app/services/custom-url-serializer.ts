import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';


export class CustomUrlSerializer implements UrlSerializer {
  private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
    const reg = new RegExp('/(modal)/([^\/]*)');
    url = url.replace(reg, '$1/($1:$2)' );
    return this._defaultUrlSerializer.parse(url);
  }

  serialize(tree: UrlTree): string {
    let url = this._defaultUrlSerializer.serialize(tree);
    const reg = new RegExp('\\(modal:([^]*)\\)');
    url = url.replace(reg, '$1');
    return url;
  }
}
