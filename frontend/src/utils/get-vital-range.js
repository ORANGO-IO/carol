export function getVitalRange(vital, age) {
    if (!age || age < 1) return null;
    switch (vital) {
        case "diastolic":
            if (age <= 2) return { min: 42, max: 63 };
            if (age <= 5) return { min: 46, max: 72 };
            if (age <= 9) return { min: 57, max: 76 };
            if (age <= 12) return { min: 61, max: 80 };
            if (age <= 15) return { min: 64, max: 83 };
            return { min: 90, max: 140 };
        case "systolic":
            if (age <= 2) return { min: 86, max: 106 };
            if (age <= 5) return { min: 89, max: 112 };
            if (age <= 9) return { min: 97, max: 115 };
            if (age <= 12) return { min: 102, max: 120 };
            if (age <= 15) return { min: 110, max: 131 };
            return { min: 90, max: 140 };
        case "heartRate":
            if (age <= 2) return { min: 98, max: 140 };
            if (age <= 5) return { min: 80, max: 120 };
            if (age <= 9) return { min: 75, max: 118 };
            if (age <= 12) return { min: 70, max: 110 };
            if (age <= 15) return { min: 65, max: 105 };
            return { min: 60, max: 100 };
        case "respiratoryRate":
            if (age <= 2) return { min: 22, max: 37 };
            if (age <= 5) return { min: 20, max: 28 };
            if (age <= 9) return { min: 18, max: 25 };
            if (age <= 12) return { min: 16, max: 23 };
            if (age <= 15) return { min: 12, max: 20 };
            return { min: 12, max: 20 };
        default:
            return null;
    }
}