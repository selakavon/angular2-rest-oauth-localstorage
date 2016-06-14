import {Injectable} from '@angular/core';

@Injectable()
export class URLParserService {
    
    parseUrl(url: string) {
        
        let a = document.createElement('a');
        a.href = url;
        
        return this.buildParsedURL(a);
    }
    
    private buildParsedURL(element: any): ParsedURL {
        let parsed = new ParsedURL();
        parsed.hostname = element.hostname;
        parsed.pathname = element.pathname;
        parsed.search = element.search;
        
        return parsed;
    }
    
}

export class ParsedURL {
    hostname: string;
    pathname: string;
    search: string;
}