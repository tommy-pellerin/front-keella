import { render, waitFor } from '@testing-library/react';
import Profile from '../components/user/profile';
import * as dataFetch from '../services/data-fetch';
import * as ReactRouterDom from 'react-router-dom';
import * as Jotai from 'jotai';
import { userAtom } from '../store/user';

// Configurer Jasmine pour mocker les dépendances
beforeEach(() => {
  spyOn(dataFetch, 'getData').and.returnValue(Promise.resolve({
    username: 'testUser',
    created_at: '2020-01-01',
    participated_workouts: [],
    hosted_workouts: [],
  }));
  spyOn(ReactRouterDom, 'useParams').and.returnValue({ user_id: '123' });
  spyOn(Jotai, 'useAtom').and.returnValue([{ email: 'test@example.com' }, () => {}]);
});

describe('Profile Component', () => {
  it('fetches and displays user data', async (done) => {
    const { getByText } = render(<Profile />);

    await waitFor(() => {
      expect(dataFetch.getData).toHaveBeenCalled();
      expect(getByText('Compte de testUser')).toBeInTheDocument();
      expect(getByText(/Actif depuis/)).toBeInTheDocument();
      done();
    });
  });
});