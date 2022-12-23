import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import {  Modal } from 'react-bootstrap';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform some action with the email address, such as sending a notification
    setShowModal(false);
  };

  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <>
      <div
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='edit-icon'
          />
          <MdOutlineNotificationAdd onClick={() => setShowModal(true)} />
        </div>
      </div>
      <div>
        <Modal
          className='modal-center'
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Send Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <label htmlFor='email'></label>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                
              />
              <button type='submit' className='send'>Send</button>
              <button type='button' onClick={() => setShowModal(false)} className='cancel'>
                Cancel
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  ));
};

export default Todo;
