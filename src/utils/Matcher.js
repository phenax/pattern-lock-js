
import EventBus from './EventBus';

export const MATCH_SUCCESS = 'MATCH_SUCCESS';
export const MATCH_FAILURE = 'MATCH_FAILURE';

// isAMatch :: (Array, any) -> Boolean
const isAMatch = (samples, value) => samples.indexOf(value) !== -1;

// Matcher :: Array<String> -> Matcher
export default (values, eventBus) => {
	const events = eventBus || EventBus();

	const emitSuccess = () => events.emit(MATCH_SUCCESS);
	const emitFailure = () => events.emit(MATCH_FAILURE);

	const matcher = {
		check: val => isAMatch(values, val) ? emitSuccess(val) : emitFailure(val),
		onSuccess: fn => { events.on(MATCH_SUCCESS, fn); return matcher; },
		onFailure: fn => { events.on(MATCH_FAILURE, fn); return matcher; },
	};

	return matcher;
};
