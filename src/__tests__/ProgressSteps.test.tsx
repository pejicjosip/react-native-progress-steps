import Content from '../Content';
import ProgressSteps from '../';
import React from 'react';
import { Text } from 'react-native';
import Title from '../Title';
import { render } from '@testing-library/react-native';

const CustomMarker = ({
  stepState: { stepIndex } = {},
}: {
  stepState?: any;
}) => <Text>Custom marker {stepIndex + 1}</Text>;

const steps = [
  {
    title: 'Title 1',
    info: ' Content 1',
  },
  {
    title: 'Title 2',
    info: ' Content 2',
  },
  {
    title: 'Title 3',
    info: ' Content 3',
  },
];

describe('ProgressSteps', () => {
  describe('orientation vertical', () => {
    it('should render all steps', () => {
      const { queryByText } = render(
        <ProgressSteps currentStep={0} steps={steps} />
      );

      expect(queryByText('Title 1')).toBeTruthy();
      expect(queryByText('Content 1')).toBeTruthy();
      expect(queryByText('Title 2')).toBeTruthy();
      expect(queryByText('Content 2')).toBeTruthy();
    });

    it('should render default Marker', () => {
      const { queryByText } = render(
        <ProgressSteps currentStep={0} steps={steps} />
      );

      expect(queryByText('1')).toBeTruthy();
      expect(queryByText('2')).toBeTruthy();
    });

    it('should render custom Marker', () => {
      const { queryByText } = render(
        <ProgressSteps
          marker={<CustomMarker />}
          currentStep={0}
          steps={steps}
        />
      );

      expect(queryByText('Custom marker 1')).toBeTruthy();
      expect(queryByText('Custom marker 2')).toBeTruthy();
    });

    it('should render without first content', () => {
      const { queryByText } = render(
        <ProgressSteps
          currentStep={0}
          steps={[
            {
              title: 'Title 1',
            },
            {
              title: 'Title 2',
              info: 'Content 2',
            },
          ]}
        />
      );

      expect(queryByText('Title 1')).toBeTruthy();
      expect(queryByText('Content 1')).toBeFalsy();
      expect(queryByText('Title 2')).toBeTruthy();
      expect(queryByText('Content 2')).toBeTruthy();
    });

    it('should render with custom colors', () => {
      const { queryByText } = render(
        <ProgressSteps
          currentStep={1}
          steps={steps}
          colors={{
            title: {
              text: { normal: 'yellow', active: 'red', completed: 'blue' },
            },
            marker: {
              text: {
                normal: 'yellow',
                active: 'red',
                completed: 'blue',
              },
              line: {
                normal: 'yellow',
                active: 'red',
                completed: 'blue',
              },
            },
          }}
        />
      );

      expect(queryByText('1').props.style.color).toEqual('blue');
      expect(queryByText('Title 1').props.style.color).toEqual('blue');
      expect(queryByText('2').props.style.color).toEqual('red');
      expect(queryByText('Title 2').props.style.color).toEqual('red');
      expect(queryByText('3').props.style.color).toEqual('yellow');
      expect(queryByText('Title 3').props.style.color).toEqual('yellow');
    });
  });

  describe('orientation horizontal', () => {
    it('should render all steps', () => {
      const { queryByText } = render(
        <ProgressSteps orientation="horizontal" currentStep={0} steps={steps} />
      );

      expect(queryByText('Title 1')).toBeTruthy();
      expect(queryByText('Content 1')).toBeTruthy();
      expect(queryByText('Title 2')).toBeTruthy();
      expect(queryByText('Content 2')).toBeTruthy();
    });

    it('should render default Marker', () => {
      const { queryByText } = render(
        <ProgressSteps orientation="horizontal" currentStep={0} steps={steps} />
      );

      expect(queryByText('1')).toBeTruthy();
      expect(queryByText('2')).toBeTruthy();
    });

    it('should render custom Marker', () => {
      const { queryByText } = render(
        <ProgressSteps
          orientation="horizontal"
          marker={<CustomMarker />}
          currentStep={0}
          steps={steps}
        />
      );

      expect(queryByText('Custom marker 1')).toBeTruthy();
      expect(queryByText('Custom marker 2')).toBeTruthy();
    });

    it('should render without first content', () => {
      const { queryByText } = render(
        <ProgressSteps
          orientation="horizontal"
          currentStep={0}
          steps={[
            {
              title: 'Title 1',
            },
            {
              title: 'Title 2',
              info: 'Content 2',
            },
          ]}
        />
      );

      expect(queryByText('Title 1')).toBeTruthy();
      expect(queryByText('Content 1')).toBeFalsy();
      expect(queryByText('Title 2')).toBeTruthy();
      expect(queryByText('Content 2')).toBeTruthy();
    });

    it('should render with custom colors', () => {
      const { queryByText } = render(
        <ProgressSteps
          orientation="horizontal"
          currentStep={1}
          steps={steps}
          colors={{
            title: {
              text: { normal: 'yellow', active: 'red', completed: 'blue' },
            },
            marker: {
              text: {
                normal: 'yellow',
                active: 'red',
                completed: 'blue',
              },
              line: {
                normal: 'yellow',
                active: 'red',
                completed: 'blue',
              },
            },
          }}
        />
      );

      expect(queryByText('1').props.style.color).toEqual('blue');
      expect(queryByText('Title 1').props.style.color).toEqual('blue');
      expect(queryByText('2').props.style.color).toEqual('red');
      expect(queryByText('Title 2').props.style.color).toEqual('red');
      expect(queryByText('3').props.style.color).toEqual('yellow');
      expect(queryByText('Title 3').props.style.color).toEqual('yellow');
    });
  });
});
