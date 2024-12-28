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
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={variant}
        onClick={() => handleClick(id, name)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle split variant={variant} className="border-none">
        <span className="visually-hidden">{t('chatHome.dropdownButton')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleModal('removeChanel', t('toastMessage.remove'), id)}>
          {t('chatHome.delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleModal('editChanel', t('toastMessage.edit'), id, name)}>
          {t('chatHome.edit')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChanel;
