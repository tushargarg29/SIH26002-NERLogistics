
# 🚚 NER Logistics

## Risk-Aware Logistics Intelligence Platform for the North Eastern Region

NER Logistics is a prototype developed for **Smart India Hackathon 2026 – Problem Statement SIH26002**.

The platform focuses on improving logistics and transportation reliability in the **North Eastern Region (NER) of India** by considering not only distance and travel time, but also hazards such as **landslides, floods, heavy rainfall, road blockages, and accessibility risks**.

The core idea is simple:

> **The shortest route is not always the safest or most reliable route.**

NER Logistics aims to provide risk-aware route recommendations for logistics and essential-goods transportation.

---

## 🎯 Problem

Transportation and logistics in the North Eastern Region can be affected by:

- Landslides
- Floods
- Heavy rainfall
- Road blockages
- Difficult terrain
- Road accessibility issues
- Unexpected transportation delays

A conventional navigation system may primarily focus on finding a route based on distance, travel time, or available road information.

NER Logistics introduces an additional layer of **risk awareness** to help identify safer and more reliable routes.

---

## 💡 Key Features

### 🗺️ Interactive Logistics Map

- Interactive map of the North Eastern Region
- Origin and destination selection
- OpenStreetMap-based visualization
- Route visualization using Leaflet

### 🛣️ Route Planning

- Driving route calculation
- Alternative route detection
- Distance estimation
- Estimated travel time
- Route comparison

### ⚠️ Hazard & Disaster Awareness

The prototype currently supports simulated hazard information for:

- Landslides
- Floods
- Heavy rainfall
- Road blockages

Hazards are displayed directly on the map with severity information.

### 🧠 Risk-Aware Route Recommendation

Instead of selecting a route only based on travel time, the system analyzes the proximity of routes to hazard zones and calculates a risk score.

### 🌐 Local Language Support

The platform supports **local languages for users in the North Eastern Region**, making the system more accessible and easier to use for local people who may prefer communicating in their regional language rather than English.

This feature improves accessibility and helps make the logistics platform more **inclusive and user-friendly for local communities and logistics operators**.

The current prototype uses a simplified scoring approach:

```text
Route Score = Travel Time + Risk Penalty
