import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator } from '@storybook/react'

addDecorator((Story) => (
  <MemoryRouter
    initialEntries={['/', 'posts']}
  >
    <Story />
    </MemoryRouter>
))
