import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminBookItem } from './AdminBookItem';

describe('AdminBookItem', () => {
  it('guarda los cambios de los datos del libro y permite cancelar la edición', async () => {
    const libro = {
      titulo: 'Título original',
      autor: 'Autora original',
      precio: '$10.000',
      stock: 3,
      categoria: 'Clásicos',
      imagen: '/portada.jpg'
    };
    const onActualizarLibro = vi.fn().mockResolvedValue(undefined);

    render(
      <AdminBookItem
        libro={libro}
        onActualizarLibro={onActualizarLibro}
        onEliminarLibro={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Título' }), {
      target: { value: 'Título actualizado' }
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Stock' }), {
      target: { value: '8' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(onActualizarLibro).toHaveBeenCalledWith(libro, {
      titulo: 'Título actualizado',
      autor: 'Autora original',
      precio: '$10.000',
      stock: 8,
      categoria: 'Clásicos',
      imagen: '/portada.jpg'
    });
    await waitFor(() => {
      expect(screen.queryByRole('textbox', { name: 'Título' })).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByRole('textbox', { name: 'Título' })).not.toBeInTheDocument();
  });

  it('conserva el formulario y muestra el error cuando falla la actualización', async () => {
    const onActualizarLibro = vi.fn().mockRejectedValue(new Error('Error HTTP 500'));

    render(
      <AdminBookItem
        libro={{ id: 1, titulo: 'Libro', autor: 'Autora', precio: '$1', stock: 1 }}
        onActualizarLibro={onActualizarLibro}
        onEliminarLibro={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Error HTTP 500');
    expect(screen.getByRole('textbox', { name: 'Título' })).toBeInTheDocument();
  });
});
