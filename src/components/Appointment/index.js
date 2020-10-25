import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    const dateParse = parseISO(data.item.date);
    const newDate = formatRelative(dateParse, new Date(), {
      locale: pt,
      addSuffix: true,
    });

    return newDate;
  }, [data.date]);

  return (
    <Container past={data.item.past}>
      <Left>
        <Avatar
          source={{
            uri: data.item.provider.avatar
              ? data.item.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.item.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.item.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.object,
  onCancel: PropTypes.func,
};
