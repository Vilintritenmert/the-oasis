import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useEditSettings } from './useEditSettings';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { isSettingsUpdating, updateSetting } = useEditSettings();

  if (isLoading) return <Spinner />;

  function handleUpdateSettings(event) {
    const { name, value } = event.target;
    if (value && settings[name] !== Number(value))
      updateSetting({
        [event.target.name]: event.target.value,
      });
  }
 
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isSettingsUpdating}
          name="minBookingLength"
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isSettingsUpdating}
          name="maxBookingLength"
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isSettingsUpdating}
          name="maxGuestsPerBooking"
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isSettingsUpdating}
          name="breakfastPrice"
          onBlur={handleUpdateSettings}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
