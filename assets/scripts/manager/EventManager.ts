// Created by carolsail

interface IEventItem {
    event: Function
    context: unknown
}

export enum EventType {
    OPEN_LEVEL_BTN = "OPEN_LEVEL_BTN",
    UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
    GOTO_LEVEL = "GOTO_LEVEL",
    CONNECT_COMPLETE = "CONNECT_COMPLETE",
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

    messageMap: Map<String, Array<unknown[]>> = new Map()

    static get instance() {
        return this.getInstance<EventManager>()
    }

    on(name: string, event: Function, context?: unknown) {
        if (this.eventMap.has(name)) {
            const eventArr = this.eventMap.get(name)
            eventArr.push({ event, context })
        } else {
            this.eventMap.set(name, [{ event, context }])
        }
        if(this.messageMap.has(name)){
            const messages = this.messageMap.get(name)
            messages.forEach(params => {
                context ? event.apply(context, params) : event(params)
            })
            this.messageMap.delete(name)
        }
    }

    off(name: string, event: Function, context?: unknown) {
        // if (this.eventMap.has(name)) {
        //     const eventArr = this.eventMap.get(name)
        //     const index = eventArr.findIndex(item => item.event == event)
        //     if (index > -1) eventArr.splice(index, 1)
        // }
        if (this.eventMap.has(name)) {
            const eventArr = this.eventMap.get(name);
            const index = eventArr.findIndex(item =>
                item.event === event && item.context === context
            );
            if (index > -1) eventArr.splice(index, 1);
        }
    }

    emit(name: string, ...params: unknown[]) {
        if (this.eventMap.has(name)) {
            const eventArr = this.eventMap.get(name)
            eventArr.forEach(({ event, context }) => {
                context ? event.apply(context, params) : event(params)
            })
        }else{
           const messages = this.messageMap.get(name)
              if(messages){
                messages.push(params)
              }else{
                this.messageMap.set(name, [params])
              }
        }
    }

    clear() {
        this.eventMap.clear()
    }
}