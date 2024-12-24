import { t } from 'i18next';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const DropDownChanel = ({
  id,
  name,
  currentChanelId,
  handleClick,
  handleModal,
}) => {
  const variant = id === currentChanelId ? 'secondary' : 'light';
  return (
    <Dropdown className="border-none w-100 text-start" as={ButtonGroup}>
      <Button
        className="border-none w-100 text-start"
        variant={variant}
        onClick={() => handleClick(id, name)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle split variant={variant} className="border-none" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleModal('removeChanel', t('toastMessage.remove'), id)}>
          {t('chatHome.delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleModal('editChanel', t('toastMessage.edit'),id, name)}>
          {t('chatHome.edit')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChanel;
