import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;&mdash;</span>
        )}
        <div>
          {/* <Modal>
            <Modal.Open opens="edit-cabin-form">
              <button disabled={isDeleting}>
                
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin-form">
              <CreateCabinForm cabinToEdit={cabin}/>
            </Modal.Window>

            <Modal.Open opens="delete-cabin-confirm">
              <button disabled={isDeleting} >
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin-confirm">
              <ConfirmDelete resourceName={cabin.name} onConfirm={() => deleteCabin(id)} disabled={isDeleting} />
            </Modal.Window>
          </Modal> */}

          <Menus>
            <Menus.Menu>
              <Menus.Toggle id="table-action" />

              <Menus.List id="table-action">
                <Menus.Button icon={<HiSquare2Stack />}>
                  Duplicate
                </Menus.Button>

                <Menus.Button icon={<HiPencil />}>
                  Edit
                </Menus.Button>

                <Menus.Button icon={<HiTrash />} onClick={() => deleteCabin(id)}>
                  Delete
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
