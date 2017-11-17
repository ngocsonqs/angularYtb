import {PipeFactory, Pipe, Injectable, bind, ChangeDetectorRef} from "angular2/angular2";
import {AsyncPipe} from "angular2/pipes";
import * as Rx from 'rx';
import {Observable} from 'rx';

function isObservable(obs) {
  console.log(obs)
  return obs && typeof obs.subscribe === 'function';
}

class RxStrategy {
  createSubscription(async: any, updateLatestValue: any): any {
    return async.subscribe((values) => {
      updateLatestValue(values);
    }, e => { throw e; });
  }
  dispose(subscription: any): void { subscription.dispose(); }
  onDestroy(subscription: any): void { subscription.dispose(); }
}

var _rxStrategy = new RxStrategy();
 
@Pipe({name: 'rx'})
export class RxPipe extends AsyncPipe {
  constructor(public _ref: ChangeDetectorRef) { super(_ref); }

  supports(obs) { return isObservable(obs); }

  _selectStrategy(obj: Observable<any>): any {
    return _rxStrategy;
  }
}
 
export var rxPipeInjectables: Array<any> = [
  bind(RxPipe).toValue(RxPipe)
];