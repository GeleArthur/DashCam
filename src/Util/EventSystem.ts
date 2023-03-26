type Listener<T> = (payload: T) => void;

class Event<T> {
	private listeners: Listener<T>[] = [];

	subscribe(listener: Listener<T>) {
		this.listeners.push(listener);
	}

	unsubscribe(listener: Listener<T>) {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}

	invoke(payload: T) {
		this.listeners.forEach((listener) => {
			try {
				listener(payload);
			} catch (error) {
				console.log(error);
			}
		});
	}
}

export { Event };
