function subscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
    document.addEventListener(eventName, listener);
}

function publish(eventName: string, data: string) {
    const event: CustomEvent = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe};
