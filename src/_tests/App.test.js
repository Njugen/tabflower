import React from 'react';
import { shallow } from 'enzyme';
import App from './../App';

const predefinedComponent = () => {
    const component = shallow(<App />);
    return component;
}

let testComponent;

describe("Test <App /> component behaviour at mount", () => {
    
    beforeEach(() => {
        testComponent = predefinedComponent();
    });

    test("The state is correctly preset with no modifications, if no functions change the state at mount", () => {
        const componentInstance = testComponent.instance();
        const expectedState = {
            currentView: {},
            routes: [],
            modal: {},
            errors: [],
            MainNavBar: {},
            refreshFactor: 0
        };
        
        expect(componentInstance.state).toStrictEqual(expectedState);
    });
});

describe("Unit test of individual methods located in the <App /> component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        testComponent = predefinedComponent();
    });
    
    describe("Test the updateState() method in various situations", () => {
        
        // NOTE: THIS TEST IS NOT VERY THOUGTFUL... CHECK AND CONSIDER AGAIN
        test("this.state changes if the \"newProps\" parameter is anything but falsy", () => {
            const componentInstance = testComponent.instance();
            const expectedState = {
                currentView: {},
                routes: [],
                modal: {},
                errors: [],
                MainNavBar: {},
                refreshFactor: 0
            };

            componentInstance.updateState("Test string", false, () => {});

            expect(componentInstance.state).not.toStrictEqual(expectedState);
        })
    });
});