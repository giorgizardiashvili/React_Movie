import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="loader">
      <FaSpinner className="spinner" />
    </div>
  );
}