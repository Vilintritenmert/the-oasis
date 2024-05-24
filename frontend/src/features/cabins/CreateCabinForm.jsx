import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ cabinToEdit = { discount: 0 }, onCloseModal }) {
  const { id, image, ...editCabinProps } = cabinToEdit;
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: editCabinProps,
  });
  const { errors } = formState;

  const { createOrUpdate, isCreateOrUpdateLoading } = useCreateCabin();

  function onSubmit(data) {
    createOrUpdate({
      ...data,
      image: data.image.length > 0 ? data.image[0] : undefined,
      id,
    }, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
      }
    });

  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" error={errors?.name}>
        <Input
          disabled={isCreateOrUpdateLoading}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity}>
        <Input
          disabled={isCreateOrUpdateLoading}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 2,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice}>
        <Input
          disabled={isCreateOrUpdateLoading}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 2,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount}>
        <Input
          type="number"
          id="discount"
          disabled={isCreateOrUpdateLoading}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              +value <= +getValues().regularPrice ||
              'Discount could not be more then regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description}>
        <Textarea
          type="number"
          id="description"
          disabled={isCreateOrUpdateLoading}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image}>
        <FileInput
          disabled={isCreateOrUpdateLoading}
          id="image"
          accept="image/*"
          {...register('image', {
            required: id ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isCreateOrUpdateLoading}
          variation="secondary"
          onClick={() => onCloseModal?.()}
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isCreateOrUpdateLoading}>
          {id ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
