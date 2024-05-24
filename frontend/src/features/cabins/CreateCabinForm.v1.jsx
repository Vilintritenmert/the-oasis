import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { isLoading: isCreateOrUpdateLoading, mutate } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries(['cabin']);
      reset();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image.item(0) });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
          defaultValue={0}
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
          defaultValue={''}
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
            required: editId ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isCreateOrUpdateLoading}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isCreateOrUpdateLoading}>
          {editId ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
