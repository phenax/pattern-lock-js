
const THEMES = {};

THEMES.dark = {
	default: {
		colors: {
			accent: '#ae64cd',
			primary: '#ffffff',
			bg: '#2c3e50',
		},
		dimens: {
			line_width: 6,
			node_radius: 20,
			node_core: 8,
			node_ring: 1,
		}
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

THEMES.light = {
	default: {
		colors: {
			accent: '#ae64cd',
			primary: '#34495e',
			bg: '#ecf0f1',
		},
		dimens: {
			line_width: 6,
			node_radius: 20,
			node_core: 8,
			node_ring: 1,
		}
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

export default THEMES;
