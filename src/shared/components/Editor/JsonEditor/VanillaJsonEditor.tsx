import { JSONEditor, type JSONEditorPropsOptional } from 'vanilla-jsoneditor';
import { useEffect, useRef } from 'react';
import type { JsonEditorProps } from './types';

export default function VanillaJSONEditor(props: JSONEditorPropsOptional) {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JsonEditorProps | null>(null);

  useEffect(() => {
    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current as Element,
      props: {
        mainMenuBar: false,
        navigationBar: false,
      },
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor?.current?.destroy?.();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      console.log('update props', props);
      refEditor?.current?.updateProps?.(props);
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}
