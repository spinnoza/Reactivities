import { makeObservable, observable } from "mobx"

export class ActivityStore{
    title = 'Hello from Mobx!'
    constructor(){
        makeObservable(this,{
            title:observable
        });
    }
}

