import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setSuccess(false);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setSuccess(true);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  let buttonText;
  if (sending) {
    buttonText = "En cours";
  } else if (success) {
    buttonText = "Envoyé !";
  } else {
    buttonText = "Envoyer";
  }

  let buttonType;

  if (sending) {
    buttonType = BUTTON_TYPES.DISABLED;
  } else if (success) {
      buttonType = BUTTON_TYPES.SUCCESS;
    } else {
      buttonType = BUTTON_TYPES.SUBMIT;
    }

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={buttonType} data-testid="button-test-id">
            {buttonText}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
