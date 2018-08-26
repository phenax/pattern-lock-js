
const themes = {};

const DEFAULT_DIMENS = {
	line_width: 6,
	node_radius: 20,
	node_core: 8,
	node_ring: 1,
};

themes.dark = {
	default: {
		colors: {
			accent: '#ae64cd',
			primary: '#ffffff',
			bg: '#2c3e50',
		},
		dimens: DEFAULT_DIMENS,
	},
	success: {
		colors: {
			accent: '#51e980',
		}
	},
	failure: {
		colors: {
			accent: '#e74c3c',
		}
	},
};

themes.light = {
	default: {
		colors: {
			accent: '#ae64cd',
			primary: '#34495e',
			bg: '#ecf0f1',
		},
		dimens: DEFAULT_DIMENS,
	},
	success: {
		colors: {
			accent: '#27ae60',
		}
	},
	failure: {
		colors: {
			accent: '#e74c3c',
		}
	},
};

export default themes;
