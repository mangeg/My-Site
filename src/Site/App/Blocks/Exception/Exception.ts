/// <reference path="../../../Tools/Typings/typescriptApp.d.ts"/>

module Blocks.Exception {
    export interface IException {
        catcher: (message: string) => (reason: string) => void;
    }

    export class Exception implements IException {
        //static $inject: Array<string> = ["logger"];
        constructor() { }

        //catcher = (message: string) => (reason: string) => this.logger.error(message, reason);
        catcher = (message: string) => (reason: string) => {};
    }
}