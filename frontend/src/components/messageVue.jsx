import { useSelector } from 'react-redux';
import { selectors } from '../slices/messageSlice.js';

const MessageComponent = () => {
  const messages = useSelector(selectors.selectAll);
  console.log(messages);
  return (
    <div>
      <ul>
        {messages.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;
