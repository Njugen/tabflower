import React from 'react';
import Modal from './modal';
import renderer from 'react-test-renderer';

it("Check that the modal is rendered correctly", () => {
    const dataProperty = {
        params: {}
    }
    const tree = renderer.create(<Modal data={dataProperty} onRaiseToErrorOverlay={() => {}} onDismiss={() => {}}></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
});