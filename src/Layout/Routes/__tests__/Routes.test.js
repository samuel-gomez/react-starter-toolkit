import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { LayoutMembers, LayoutDashboard, LayoutSlashDesignSystem, LayoutSearchMembers, LayoutModal, LayoutButton } from '../Routes';
import Routes from '..';

describe('Route', () => {
  it('Should render Routes', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('NotFound Page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/random']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('LayoutDashboard', () => {
  it('Render LayoutDashboard', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LayoutDashboard />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('LayoutMembers', () => {
  it('Render LayoutMembers', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LayoutMembers />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('LayoutSlashDesignSystem', () => {
  it('Render LayoutSlashDesignSystem', async () => {
    await act(async () => {
      const { asFragment } = render(
        <MemoryRouter>
          <LayoutSlashDesignSystem />
        </MemoryRouter>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('LayoutSearchMembers', () => {
  it('Render LayoutSearchMembers', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LayoutSearchMembers />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('LayoutModal', () => {
  it('Render LayoutModal', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LayoutModal />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('LayoutButton', () => {
  it('Render LayoutButton', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LayoutButton />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
