import { Tabs } from '@axa-fr/react-toolkit-all';
import TitleTabsLiveCode from './TitleTabsLiveCode';
import './TabsLiveCode.scss';

type TTabsLiveCode = {
  children: JSX.Element[];
};

const TabsLiveCode = ({ children }: TTabsLiveCode) => (
  <Tabs classModifier="tabs-live-code" activeIndex="0">
    {children
      .filter(({ props: { hideComponent } }) => !hideComponent)
      .map((component: JSX.Element) => (
        <Tabs.Tab
          key={component.key}
          title={<TitleTabsLiveCode title={component.props.title} icon={component.props.icon} />}
          classModifier="has-icon-left"
        >
          {component}
        </Tabs.Tab>
      ))}
  </Tabs>
);

export default TabsLiveCode;
