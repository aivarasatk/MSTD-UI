﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.7.0.0 (NJsonSchema v10.1.24.0 (Newtonsoft.Json v12.0.0.2)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class Client {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * Returns a list of torrrent sources for MSTD client app
     * @return Success
     */
    sources(  cancelToken?: CancelToken | undefined): Promise<SourceDto[]> {
        let url_ = this.baseUrl + "/sources";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processSources(_response);
        });
    }

    protected processSources(response: AxiosResponse): Promise<SourceDto[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ResponseMessage.fromJS(resultData500);
            return throwException("Server Error", status, _responseText, _headers, result500);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SourceDto.fromJS(item));
            }
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SourceDto[]>(<any>null);
    }

    /**
     * Provides access to torrent search based on provided parameters
     * @param urls Urls to use for search. Invalid urls will not be used
     * @param category In which torrent category to search
     * @param searchValue Text that is used to query torrents
     * @param page Current search page. Must be greater than 0
     * @return Success
     */
    torrents(urls: string[], sortOrder: Sorting, category: TorrentCategory, searchValue: string, page: number , cancelToken?: CancelToken | undefined): Promise<TorrentSearchResult> {
        let url_ = this.baseUrl + "/torrents?";
        if (urls === undefined || urls === null)
            throw new Error("The parameter 'urls' must be defined and cannot be null.");
        else
            urls && urls.forEach(item => { url_ += "urls=" + encodeURIComponent("" + item) + "&"; });
        if (sortOrder === undefined || sortOrder === null)
            throw new Error("The parameter 'sortOrder' must be defined and cannot be null.");
        else
            url_ += "sortOrder=" + encodeURIComponent("" + sortOrder) + "&";
        if (category === undefined || category === null)
            throw new Error("The parameter 'category' must be defined and cannot be null.");
        else
            url_ += "category=" + encodeURIComponent("" + category) + "&";
        if (searchValue === undefined || searchValue === null)
            throw new Error("The parameter 'searchValue' must be defined and cannot be null.");
        else
            url_ += "searchValue=" + encodeURIComponent("" + searchValue) + "&";
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined and cannot be null.");
        else
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processTorrents(_response);
        });
    }

    protected processTorrents(response: AxiosResponse): Promise<TorrentSearchResult> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ResponseMessage.fromJS(resultData500);
            return throwException("Server Error", status, _responseText, _headers, result500);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = TorrentSearchResult.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            if (Array.isArray(resultData400)) {
                result400 = [] as any;
                for (let item of resultData400)
                    result400!.push(ResponseMessage.fromJS(item));
            }
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TorrentSearchResult>(<any>null);
    }

    /**
     * Provides magnet links for individual torrent entries.
     * @param baseUrl Valid source url e.g. https://1337x.to/, https://tpb.party/
     * @param torrentPath Path to torrent after base url e.g. torrent/36312396/Perry.Mason.2020.S01E06.WEB.x264-PHOENiX[TGx]
     * @param source One of the data providers like 1337x or ThePirateBay
     * @return Success
     */
    magnet(baseUrl: string, torrentPath: string, source: TorrentSource , cancelToken?: CancelToken | undefined): Promise<MagnetResponse> {
        let url_ = this.baseUrl + "/magnet?";
        if (baseUrl === undefined || baseUrl === null)
            throw new Error("The parameter 'baseUrl' must be defined and cannot be null.");
        else
            url_ += "baseUrl=" + encodeURIComponent("" + baseUrl) + "&";
        if (torrentPath === undefined || torrentPath === null)
            throw new Error("The parameter 'torrentPath' must be defined and cannot be null.");
        else
            url_ += "torrentPath=" + encodeURIComponent("" + torrentPath) + "&";
        if (source === undefined || source === null)
            throw new Error("The parameter 'source' must be defined and cannot be null.");
        else
            url_ += "source=" + encodeURIComponent("" + source) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processMagnet(_response);
        });
    }

    protected processMagnet(response: AxiosResponse): Promise<MagnetResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ResponseMessage.fromJS(resultData500);
            return throwException("Server Error", status, _responseText, _headers, result500);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = MagnetResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ResponseMessage.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ResponseMessage.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MagnetResponse>(<any>null);
    }

    /**
     * Provides html description for individual torrent entries.
     * @param baseUrl Valid source url e.g. https://1337x.to/, https://tpb.party/
     * @param torrentPath Path to torrent after base url e.g. torrent/36312396/Perry.Mason.2020.S01E06.WEB.x264-PHOENiX[TGx]
     * @param source One of the data providers like 1337x or ThePirateBay
     * @return Success
     */
    description(baseUrl: string, torrentPath: string, source: TorrentSource , cancelToken?: CancelToken | undefined): Promise<DescriptionResponse> {
        let url_ = this.baseUrl + "/description?";
        if (baseUrl === undefined || baseUrl === null)
            throw new Error("The parameter 'baseUrl' must be defined and cannot be null.");
        else
            url_ += "baseUrl=" + encodeURIComponent("" + baseUrl) + "&";
        if (torrentPath === undefined || torrentPath === null)
            throw new Error("The parameter 'torrentPath' must be defined and cannot be null.");
        else
            url_ += "torrentPath=" + encodeURIComponent("" + torrentPath) + "&";
        if (source === undefined || source === null)
            throw new Error("The parameter 'source' must be defined and cannot be null.");
        else
            url_ += "source=" + encodeURIComponent("" + source) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDescription(_response);
        });
    }

    protected processDescription(response: AxiosResponse): Promise<DescriptionResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ResponseMessage.fromJS(resultData500);
            return throwException("Server Error", status, _responseText, _headers, result500);
        } else if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = DescriptionResponse.fromJS(resultData200);
            return result200;
        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ResponseMessage.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = ResponseMessage.fromJS(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<DescriptionResponse>(<any>null);
    }
}

export class ResponseMessage implements IResponseMessage {
    message?: string | undefined;
    value?: string | undefined;

    constructor(data?: IResponseMessage) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["Message"];
            this.value = _data["Value"];
        }
    }

    static fromJS(data: any): ResponseMessage {
        data = typeof data === 'object' ? data : {};
        let result = new ResponseMessage();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Message"] = this.message;
        data["Value"] = this.value;
        return data; 
    }
}

export interface IResponseMessage {
    message?: string | undefined;
    value?: string | undefined;
}

export enum TorrentSource {
    ThePirateBay = "ThePirateBay",
    Leetx = "Leetx",
    Kickass = "Kickass",
}

export enum SiteState {
    Active = "Active",
    Down = "Down",
}

export class Site implements ISite {
    /** Url of the mirror or orgininal site */
    url?: string | undefined;
    state?: SiteState;

    constructor(data?: ISite) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.url = _data["Url"];
            this.state = _data["State"];
        }
    }

    static fromJS(data: any): Site {
        data = typeof data === 'object' ? data : {};
        let result = new Site();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Url"] = this.url;
        data["State"] = this.state;
        return data; 
    }
}

export interface ISite {
    /** Url of the mirror or orgininal site */
    url?: string | undefined;
    state?: SiteState;
}

export class SourceDto implements ISourceDto {
    /** UI friendly source name */
    name?: string | undefined;
    uniqueId?: TorrentSource;
    /** A list of possible Urls and their availability for queries */
    sites?: Site[] | undefined;

    constructor(data?: ISourceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["Name"];
            this.uniqueId = _data["UniqueId"];
            if (Array.isArray(_data["Sites"])) {
                this.sites = [] as any;
                for (let item of _data["Sites"])
                    this.sites!.push(Site.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SourceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Name"] = this.name;
        data["UniqueId"] = this.uniqueId;
        if (Array.isArray(this.sites)) {
            data["Sites"] = [];
            for (let item of this.sites)
                data["Sites"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ISourceDto {
    /** UI friendly source name */
    name?: string | undefined;
    uniqueId?: TorrentSource;
    /** A list of possible Urls and their availability for queries */
    sites?: Site[] | undefined;
}

export enum Sorting {
    TimeDesc = "TimeDesc",
    TimeAsc = "TimeAsc",
    SizeDesc = "SizeDesc",
    SizeAsc = "SizeAsc",
    SeedersDesc = "SeedersDesc",
    SeedersAsc = "SeedersAsc",
    LeecherssDesc = "LeecherssDesc",
    LeechersAsc = "LeechersAsc",
}

export enum TorrentCategory {
    All = "All",
    Movies = "Movies",
    TV = "TV",
    Games = "Games",
    Music = "Music",
    Applications = "Applications",
    XXX = "XXX",
}

export class SizeEntity implements ISizeEntity {
    value?: number;
    postfix?: string | undefined;

    constructor(data?: ISizeEntity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.value = _data["Value"];
            this.postfix = _data["Postfix"];
        }
    }

    static fromJS(data: any): SizeEntity {
        data = typeof data === 'object' ? data : {};
        let result = new SizeEntity();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Value"] = this.value;
        data["Postfix"] = this.postfix;
        return data; 
    }
}

export interface ISizeEntity {
    value?: number;
    postfix?: string | undefined;
}

export class TorrentEntry implements ITorrentEntry {
    title?: string | undefined;
    date?: Date;
    size?: SizeEntity;
    uploader?: string | undefined;
    seeders?: number;
    leechers?: number;
    descriptionHtml?: string | undefined;
    torrentUri?: string | undefined;
    torrentMagnet?: string | undefined;
    source?: TorrentSource;

    constructor(data?: ITorrentEntry) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["Title"];
            this.date = _data["Date"] ? new Date(_data["Date"].toString()) : <any>undefined;
            this.size = _data["Size"] ? SizeEntity.fromJS(_data["Size"]) : <any>undefined;
            this.uploader = _data["Uploader"];
            this.seeders = _data["Seeders"];
            this.leechers = _data["Leechers"];
            this.descriptionHtml = _data["DescriptionHtml"];
            this.torrentUri = _data["TorrentUri"];
            this.torrentMagnet = _data["TorrentMagnet"];
            this.source = _data["Source"];
        }
    }

    static fromJS(data: any): TorrentEntry {
        data = typeof data === 'object' ? data : {};
        let result = new TorrentEntry();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Title"] = this.title;
        data["Date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["Size"] = this.size ? this.size.toJSON() : <any>undefined;
        data["Uploader"] = this.uploader;
        data["Seeders"] = this.seeders;
        data["Leechers"] = this.leechers;
        data["DescriptionHtml"] = this.descriptionHtml;
        data["TorrentUri"] = this.torrentUri;
        data["TorrentMagnet"] = this.torrentMagnet;
        data["Source"] = this.source;
        return data; 
    }
}

export interface ITorrentEntry {
    title?: string | undefined;
    date?: Date;
    size?: SizeEntity;
    uploader?: string | undefined;
    seeders?: number;
    leechers?: number;
    descriptionHtml?: string | undefined;
    torrentUri?: string | undefined;
    torrentMagnet?: string | undefined;
    source?: TorrentSource;
}

export class TorrentQueryResult implements ITorrentQueryResult {
    torrentEntries?: TorrentEntry[] | undefined;
    isLastPage?: boolean;

    constructor(data?: ITorrentQueryResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["TorrentEntries"])) {
                this.torrentEntries = [] as any;
                for (let item of _data["TorrentEntries"])
                    this.torrentEntries!.push(TorrentEntry.fromJS(item));
            }
            this.isLastPage = _data["IsLastPage"];
        }
    }

    static fromJS(data: any): TorrentQueryResult {
        data = typeof data === 'object' ? data : {};
        let result = new TorrentQueryResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.torrentEntries)) {
            data["TorrentEntries"] = [];
            for (let item of this.torrentEntries)
                data["TorrentEntries"].push(item.toJSON());
        }
        data["IsLastPage"] = this.isLastPage;
        return data; 
    }
}

export interface ITorrentQueryResult {
    torrentEntries?: TorrentEntry[] | undefined;
    isLastPage?: boolean;
}

export class TorrentSearchResult implements ITorrentSearchResult {
    torrents?: TorrentQueryResult[] | undefined;
    warnings?: ResponseMessage[] | undefined;

    constructor(data?: ITorrentSearchResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["Torrents"])) {
                this.torrents = [] as any;
                for (let item of _data["Torrents"])
                    this.torrents!.push(TorrentQueryResult.fromJS(item));
            }
            if (Array.isArray(_data["Warnings"])) {
                this.warnings = [] as any;
                for (let item of _data["Warnings"])
                    this.warnings!.push(ResponseMessage.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TorrentSearchResult {
        data = typeof data === 'object' ? data : {};
        let result = new TorrentSearchResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.torrents)) {
            data["Torrents"] = [];
            for (let item of this.torrents)
                data["Torrents"].push(item.toJSON());
        }
        if (Array.isArray(this.warnings)) {
            data["Warnings"] = [];
            for (let item of this.warnings)
                data["Warnings"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ITorrentSearchResult {
    torrents?: TorrentQueryResult[] | undefined;
    warnings?: ResponseMessage[] | undefined;
}

export class MagnetResponse implements IMagnetResponse {
    magnet?: string | undefined;

    constructor(data?: IMagnetResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.magnet = _data["Magnet"];
        }
    }

    static fromJS(data: any): MagnetResponse {
        data = typeof data === 'object' ? data : {};
        let result = new MagnetResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Magnet"] = this.magnet;
        return data; 
    }
}

export interface IMagnetResponse {
    magnet?: string | undefined;
}

export class DescriptionResponse implements IDescriptionResponse {
    descriptionHtml?: string | undefined;

    constructor(data?: IDescriptionResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.descriptionHtml = _data["DescriptionHtml"];
        }
    }

    static fromJS(data: any): DescriptionResponse {
        data = typeof data === 'object' ? data : {};
        let result = new DescriptionResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["DescriptionHtml"] = this.descriptionHtml;
        return data; 
    }
}

export interface IDescriptionResponse {
    descriptionHtml?: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}