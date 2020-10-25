import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

function Dashboard({ navigation }) {
  const isFocused = navigation.isFocused();
  const [appointments, setAppointments] = useState([]);
  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }
  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={(item) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    isFocused: PropTypes.func.isRequired,
  }).isRequired,
};
