import React from 'react'
import { View } from 'react-native'
import HealthBloodGlucoseLogComponent from './bloodglucose/HealthBloodGlucoseLogComponent'
import HealthBloodPressureLogComponent from './bloodpressure/HealthBloodPressureLogComponent'
import HealthBodyFatLogComponent from './bodyfat/HealthBodyFatLogComponent'
import HealthSleepHoursLogComponent from './sleephours/HealthSleepHoursLogComponent'
import HealthWaterIntakeLogComponent from './waterintake/HealthWaterIntakeLogComponent'
import HealthWeightLogComponent from './weight/HealthWeightLogComponent'

export default function HealthLogComponent() {

    return (
        <View>
            <HealthWeightLogComponent />
            <HealthWaterIntakeLogComponent />
            <HealthSleepHoursLogComponent />
            <HealthBloodPressureLogComponent />
            <HealthBloodGlucoseLogComponent />
            <HealthBodyFatLogComponent />
        </View>
    )

}
