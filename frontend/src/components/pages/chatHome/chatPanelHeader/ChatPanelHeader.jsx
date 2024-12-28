import { t } from 'i18next';

const ChatPanelHeader = ({ data, currentName, currentId }) => {
  const countMessages = data.filter((message) => message.channelId === currentId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        #
        {' '}
        {currentName}
      </p>
      <span className="text-muted">
        {countMessages.length}
        {' '}
        {t('chatHome.messages', { count: countMessages.length })}
      </span>
    </div>
  );
};

export default ChatPanelHeader;
