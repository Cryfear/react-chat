import React from 'react';
import { Button } from 'antd';
import './Button.scss';

interface ButtonProps {
  children: string,
}

const TypicalButton = (props : ButtonProps) => {
  return (
    <div className="button">
      <Button size="large" type="primary" {...props}></Button>
    </div>
  )
}

export default TypicalButton;