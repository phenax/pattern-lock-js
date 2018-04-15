
import { expect } from 'chai';

import * as libs from '../../js/libs';

describe('Lib/Helpers', () => {
	
	describe('hashCode', () => {
		
		it('should return empty string for if input is empty', () => {
			expect(libs.hashCode('')).to.eq('');
		});
	});
});
