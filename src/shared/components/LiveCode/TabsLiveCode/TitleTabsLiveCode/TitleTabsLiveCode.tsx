type TTitleTabsLiveCode = {
  icon: string;
  title: string;
};

const TitleTabsLiveCode = ({ icon, title }: TTitleTabsLiveCode) => (
  <>
    <i className={`glyphicon glyphicon-${icon}`} /> {title}
  </>
);

export default TitleTabsLiveCode;
