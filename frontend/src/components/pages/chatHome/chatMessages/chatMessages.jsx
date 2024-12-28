import { t } from 'i18next';

const ChatMessages = ({ data, isLoading, chanelId }) => (
    <div className="chat-messages overflow-auto px-5 ">
      {isLoading ? (
        <h1>{t('chatHome.loading')}</h1>
      ) : (
        data
          .filter((message) => message.channelId === chanelId)
          .map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              : {message.body}
            </div>
          ))
      )}
    </div>
  );

export default ChatMessages;
