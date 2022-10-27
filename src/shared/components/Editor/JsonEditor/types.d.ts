// reproduce this type because the library doesn't export it on definition type file
// to be probably remove later

export type JsonEditorProps = {
  content?: Content;
  readOnly?: boolean;
  indentation?: number | string;
  tabSize?: number;
  mode?: Mode;
  mainMenuBar?: boolean;
  navigationBar?: boolean;
  statusBar?: boolean;
  escapeControlCharacters?: boolean;
  escapeUnicodeCharacters?: boolean;
  parser?: JSONParser;
  validator?: Validator | null;
  validationParser?: JSONParser;
  pathParser?: JSONPathParser;
  queryLanguages?: QueryLanguage[];
  queryLanguageId?: string;
  onChangeQueryLanguage?: OnChangeQueryLanguage;
  onChange?: OnChange;
  onRenderValue?: OnRenderValue;
  onClassName?: OnClassName;
  onRenderMenu?: OnRenderMenu;
  onChangeMode?: OnChangeMode;
  onError?: OnError;
  onFocus?: OnFocus;
  onBlur?: OnBlur;
  get?: () => Content;
  set?: (newContent: Content) => void;
  update?: (updatedContent: Content) => void;
  patch?: (operations: JSONPatchDocument) => JSONPatchResult;
  expand?: (callback?: (path: JSONPath) => boolean) => void;
  transform?: (options: TransformModalOptions) => void;
  validate?: () => ContentErrors;
  acceptAutoRepair?: () => Content;
  scrollTo?: (path: JSONPath) => void;
  findElement?: (path: JSONPath) => Element;
  focus?: () => void;
  refresh?: () => void;
  updateProps?: (props: JSONEditorPropsOptional) => void;
  destroy?: () => void;
};
