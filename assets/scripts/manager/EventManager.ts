// Created by carolsail

interface IEventItem {
    event: Function
    context: unknown
}

export default class EventManager {
    private static _instance: any = null

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    eventMap: Map<String, Array<IEventItem>> = new Map()

    static get instance() {
        return this.getInstance<EventManager>()
    }

    on(name: string, event: Function, context?: unknown){
        if(this.eventMap.has(name)){
            const eventArr = this.eventMap.get(name)
            eventArr.push({event, context})
        }else{
            this.eventMap.set(name, [{event, context}])
        }
    }

    off(name: string, event: Function){
        if(this.eventMap.has(name)){
            const eventArr = this.eventMap.get(name)
            const index = eventArr.findIndex(item => item.event == event)
            if(index > -1) eventArr.splice(index, 1)
        }
    }

    emit(name: string, ...params: unknown[]){
        if(this.eventMap.has(name)){
            const eventArr = this.eventMap.get(name)
            eventArr.forEach(({event, context}) => {
                context ? event.apply(context, params) : event(params)
            })
        }
    }

    clear(){
        this.eventMap.clear()
    }
}