import React, { useState } from 'react';
import { Button } from '../../components/elements';
import { useParams, useNavigate } from 'react-router-dom';
import { MonthSmall } from '../../components/calendar';

export default function CalendarPage() {
  const params = useParams();
  const navigate = useNavigate();
  const contract = params.id;
  return (
    <div className="m-4">
      <div className="flex justify-between">
        <div>{contract}</div>

        <div>
          <Button onClick={() => navigate(`/profile/${contract}`)}>Profile</Button>
        </div>
      </div>

      <div>calendar page</div>
      <MonthSmall />
    </div>
  );
}
