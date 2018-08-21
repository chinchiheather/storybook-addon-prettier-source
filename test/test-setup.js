/* eslint-env jest */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.env.NODE_ENV = 'test';

// Configure Enzyme for DOM rendering
configure({ adapter: new Adapter() });
