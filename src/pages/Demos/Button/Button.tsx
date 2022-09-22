import { ReactNode } from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { withEditor, useEditable, TEvent } from 'shared/components/Editor';
import { TITLE_BAR, TITLE, buttonKnobs } from './constants';

const INITIAL_STATE = {
  classModifier: '',
  className: 'af-btn',
  label: 'valider',
  disabled: false,
  icon: '',
};

type Props = Omit<typeof INITIAL_STATE, 'icon'> & {
  icon?: string;
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

export const code = ({ label, className, classModifier, disabled, icon = '' }: Props) => `
  <Button disabled={${disabled}} className="${className}" classModifier="${classModifier}" type="submit" onClick={onClick} >
    ${icon !== '' ? `<i className="glyphicon glyphicon-${icon}"></i>` : ''}<span className="af-btn__text">${label}</span>
  </Button>
`;

const ButtonWithEditor = withEditor<Props>(
  props => (
    <LiveCode
      classModifier="with-editor"
      code={code(props)}
      scope={{
        Button,
        ...props,
      }}
    />
  ),
  buttonKnobs,
);

const ButtonEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <ButtonWithEditor {...state} onClick={onClick} onChange={onChange} />;
};

type TButtonPage = TLayout & {
  titleBar?: ReactNode;
  title?: ReactNode;
};

const ButtonPage = ({ titleBar = TITLE_BAR, title = TITLE }: TButtonPage) => (
  <Layout propsTitle={{ title: titleBar }} className="af-main" classModifier="demo">
    <section className="container">
      <h1 className="af-title--content">{title}</h1>
      <ButtonEditable />
    </section>
  </Layout>
);

export default ButtonPage;
