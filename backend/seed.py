"""
Database Seeding Script for ManganAI SQLite Database (manganai.db)
Populates initial MOIL mines, equipment, weather telemetry, and exploration zones.
"""

from database import engine, SessionLocal, Base
from models.mine import Mine
from models.production import Production
from models.equipment import Equipment
from models.weather import Weather
from models.predictions import Prediction
from models.recommendations import Recommendation
from models.exploration_zones import ExplorationZone

def seed_database():
    print("Creating all database tables in manganai.db...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(Mine).count() > 0:
            print("Database already seeded with mines. Skipping re-seed.")
            return

        print("Seeding MOIL Mines...")
        mines = [
            Mine(
                id="BALAGHAT-01",
                name="Balaghat Mine (Bharweli)",
                state="Madhya Pradesh",
                district="Balaghat",
                latitude=21.8722,
                longitude=80.2033,
                type="Underground / Deep Open Pit",
                depth_meters=435,
                status="Active - High Priority",
                reserve_mt=12.4,
                grade_percent=43.5,
                daily_target=10000.0,
                current_production=9150.0,
                predicted_production=9300.0,
                expected_shortfall=700.0,
                shortfall_pct=7.0,
                risk_level="MEDIUM",
                confidence=89,
                active_personnel=480,
                description="Deepest underground manganese mine in Asia, producing supreme battery-grade and ferromanganese ores."
            ),
            Mine(
                id="DONGRI-02",
                name="Dongri Buzurg Mine",
                state="Maharashtra",
                district="Bhandara",
                latitude=21.5542,
                longitude=79.6975,
                type="Open Cast Semi-Mechanized",
                depth_meters=110,
                status="Active",
                reserve_mt=8.7,
                grade_percent=38.2,
                daily_target=7500.0,
                current_production=7100.0,
                predicted_production=7250.0,
                expected_shortfall=250.0,
                shortfall_pct=3.3,
                risk_level="LOW",
                confidence=93,
                active_personnel=310,
                description="Key producer of high-grade dioxide manganese ore for dry-battery chemical manufacturing."
            ),
            Mine(
                id="CHIKLA-03",
                name="Chikla Mine",
                state="Maharashtra",
                district="Bhandara",
                latitude=21.5471,
                longitude=79.7611,
                type="Underground & Open Cast",
                depth_meters=220,
                status="Active - Moderate Risk",
                reserve_mt=6.2,
                grade_percent=36.4,
                daily_target=5000.0,
                current_production=4200.0,
                predicted_production=4350.0,
                expected_shortfall=650.0,
                shortfall_pct=13.0,
                risk_level="HIGH",
                confidence=86,
                active_personnel=220,
                description="Multi-horizon ore body undergoing vertical shaft deepening and hydraulic stope filling."
            ),
            Mine(
                id="UKWA-04",
                name="Ukwa Mine",
                state="Madhya Pradesh",
                district="Balaghat",
                latitude=21.9680,
                longitude=80.4670,
                type="Underground Drift Mining",
                depth_meters=180,
                status="Active",
                reserve_mt=4.8,
                grade_percent=34.8,
                daily_target=3800.0,
                current_production=3620.0,
                predicted_production=3690.0,
                expected_shortfall=110.0,
                shortfall_pct=2.9,
                risk_level="LOW",
                confidence=91,
                active_personnel=195,
                description="Low phosphorus grade ore body with dedicated aerial ropeway transport."
            ),
            Mine(
                id="TIRODI-05",
                name="Tirodi Mine",
                state="Madhya Pradesh",
                district="Balaghat",
                latitude=21.6880,
                longitude=79.7150,
                type="Open Cast Modernized",
                depth_meters=85,
                status="Active",
                reserve_mt=5.1,
                grade_percent=32.5,
                daily_target=4200.0,
                current_production=3950.0,
                predicted_production=4020.0,
                expected_shortfall=180.0,
                shortfall_pct=4.3,
                risk_level="LOW",
                confidence=88,
                active_personnel=175,
                description="Extensive open-pit operations utilizing high-capacity hydraulic excavators and heavy dumpers."
            )
        ]
        db.add_all(mines)
        db.commit()

        print("Seeding Equipment Fleet...")
        fleet = [
            Equipment(
                id="EX-017",
                mine_id="BALAGHAT-01",
                type="Excavators",
                model="Komatsu PC1250SP Hydraulic Shovel",
                status="DOWN",
                availability=0.0,
                utilization=0.0,
                downtime_hours=6.5,
                maintenance_hours=4.0,
                last_maintenance="2026-08-18",
                location="Underground Stope B4 (Level -380m)",
                production_impact_tonnes=-450.0,
                ai_recommendation="Critical hydraulic cylinder leak detected. Fast-track seal kit dispatch from Central Nagpur Stores. Redeploy EX-021 to face B4 to recover 320 T/day."
            ),
            Equipment(
                id="EX-021",
                mine_id="BALAGHAT-01",
                type="Excavators",
                model="Tata Hitachi EX1200-6",
                status="ACTIVE",
                availability=96.0,
                utilization=82.0,
                downtime_hours=0.5,
                maintenance_hours=0.0,
                last_maintenance="2026-08-29",
                location="North Highwall Face 3",
                production_impact_tonnes=520.0,
                ai_recommendation="EX-021 has high availability (96%) and can potentially be redeployed to compensate for EX-017 downtime."
            ),
            Equipment(
                id="DR-104",
                mine_id="BALAGHAT-01",
                type="Drills",
                model="Atlas Copco Boomer 282 Twin-Boom",
                status="WARNING",
                availability=78.0,
                utilization=64.0,
                downtime_hours=2.0,
                maintenance_hours=1.5,
                last_maintenance="2026-08-22",
                location="Drift C West Heading",
                production_impact_tonnes=-180.0,
                ai_recommendation="Rod feed pressure fluctuating. Water pressure regulator requires descaling during shift changeover."
            ),
            Equipment(
                id="LD-008",
                mine_id="BALAGHAT-01",
                type="Loaders",
                model="Caterpillar R1700 Underground LHD",
                status="ACTIVE",
                availability=91.0,
                utilization=87.0,
                downtime_hours=0.8,
                maintenance_hours=0.0,
                last_maintenance="2026-08-25",
                location="Ore Transfer Pass 7",
                production_impact_tonnes=380.0,
                ai_recommendation="Operating within optimal parameters. Tire tread depth at 62%, schedule inspection in 14 shifts."
            ),
            Equipment(
                id="CR-002",
                mine_id="BALAGHAT-01",
                type="Crushers",
                model="Metso Nordberg C130 Primary Jaw Crusher",
                status="MAINTENANCE",
                availability=45.0,
                utilization=38.0,
                downtime_hours=3.5,
                maintenance_hours=3.5,
                last_maintenance="2026-09-05",
                location="Surface Processing Complex",
                production_impact_tonnes=-320.0,
                ai_recommendation="Scheduled mantle liner replacement in progress (75% completed). Estimated completion at 18:30 IST."
            ),
            Equipment(
                id="TR-014",
                mine_id="BALAGHAT-01",
                type="Haulage Trucks",
                model="Scania G460 Heavy Mining Tipper",
                status="ACTIVE",
                availability=94.0,
                utilization=89.0,
                downtime_hours=0.4,
                maintenance_hours=0.0,
                last_maintenance="2026-08-30",
                location="Sub-level decline haul route",
                production_impact_tonnes=290.0,
                ai_recommendation="Optimized cycle time of 18.2 min/trip. Ideal candidate for increased trip cadence."
            )
        ]
        db.add_all(fleet)
        db.commit()

        print("Seeding Exploration Zones...")
        zones = [
            ExplorationZone(
                id="ZONE-M17",
                mine_id="BALAGHAT-01",
                zone_name="Zone M17 (Bharweli North Deep)",
                latitude=21.8845,
                longitude=80.2185,
                elevation_m=342.0,
                strata="Gondite series / Quartzite footwall",
                reserve_probability=87.0,
                estimated_reserve_mt=2.4,
                predicted_grade=31.8,
                confidence=91,
                risk_level="LOW",
                soil_moisture=58.0,
                rainfall_mm=38.0,
                ndvi=0.42,
                lst_temp_c=29.4,
                drill_holes_completed=14,
                recommended_action="Authorize Phase-2 diamond core drilling (500m depth)",
                last_survey_date="2026-08-28"
            ),
            ExplorationZone(
                id="ZONE-M18",
                mine_id="BALAGHAT-01",
                zone_name="Zone M18 (Ganga East Extension)",
                latitude=21.8610,
                longitude=80.2290,
                elevation_m=320.0,
                strata="Manganiferous phyllite & braunite reef",
                reserve_probability=92.0,
                estimated_reserve_mt=3.8,
                predicted_grade=44.2,
                confidence=94,
                risk_level="LOW",
                soil_moisture=62.0,
                rainfall_mm=44.0,
                ndvi=0.38,
                lst_temp_c=31.2,
                drill_holes_completed=22,
                recommended_action="High priority commercial reserve development",
                last_survey_date="2026-09-01"
            ),
            ExplorationZone(
                id="ZONE-M19",
                mine_id="DONGRI-02",
                zone_name="Zone M19 (Dongri West Fault Block)",
                latitude=21.5620,
                longitude=79.6820,
                elevation_m=295.0,
                strata="Cryptomelane pyrolusite lens",
                reserve_probability=74.0,
                estimated_reserve_mt=1.6,
                predicted_grade=37.5,
                confidence=83,
                risk_level="MEDIUM",
                soil_moisture=49.0,
                rainfall_mm=32.0,
                ndvi=0.48,
                lst_temp_c=33.1,
                drill_holes_completed=8,
                recommended_action="Perform geophysical resistivity sounding",
                last_survey_date="2026-08-15"
            ),
            ExplorationZone(
                id="ZONE-M20",
                mine_id="CHIKLA-03",
                zone_name="Zone M20 (Sitapatore Valley)",
                latitude=21.5390,
                longitude=79.7740,
                elevation_m=280.0,
                strata="Mica schist capping with gondite horizon",
                reserve_probability=68.0,
                estimated_reserve_mt=1.2,
                predicted_grade=29.4,
                confidence=79,
                risk_level="HIGH",
                soil_moisture=71.0,
                rainfall_mm=55.0,
                ndvi=0.54,
                lst_temp_c=28.5,
                drill_holes_completed=6,
                recommended_action="Monitor water inflow before exploratory trenching",
                last_survey_date="2026-08-20"
            )
        ]
        db.add_all(zones)
        db.commit()

        print("Seeding Weather & Environmental Observations...")
        w = Weather(
            mine_id="BALAGHAT-01",
            observation_date="2026-09-05",
            rainfall=42.0,
            soil_moisture=61.0,
            temperature=31.0,
            ndvi=0.44,
            lst_temp_c=33.2,
            humidity=78.0,
            wind_speed_kmh=14.5,
            weather_condition="Heavy Showers",
            data_status="Satellite Telemetry Verified"
        )
        db.add(w)

        print("Seeding Recommendations...")
        recs = [
            Recommendation(
                id="REC-001",
                mine_id="BALAGHAT-01",
                category="Equipment Redeployment",
                title="Redeploy High-Availability Excavator EX-021 to Underground Stope B4",
                issue="Critical excavator hydraulic downtime on EX-017 (6.5 hrs lost)",
                cause="Hydraulic cylinder seal burst under high muck pile load",
                action="Reposition Tata Hitachi EX1200 (EX-021) from secondary face to Stope B4 immediately. Assign 4 high-clearance Scania tippers.",
                expected_impact="Recovers approx 320 T/day of high-grade manganese ore, reducing net daily shortfall from 700 T to 380 T.",
                expected_recovery_tonnes=320.0,
                priority="HIGH",
                status="Pending Action",
                confidence=92,
                created_time="10 mins ago"
            ),
            Recommendation(
                id="REC-002",
                mine_id="BALAGHAT-01",
                category="Weather Preparation",
                title="Activate Deep Sump Submersible Pumps & Apply Crushed Dolomite to Haul Ramp",
                issue="Ramp traction degraded by 42mm precipitation",
                cause="Sub-surface runoff softening clay intercalations on Switchback 4",
                action="Deploy auxiliary high-head pump set #4 in South Sump. Spread 40 tonnes of dry crushed dolomite fines on Switchback Curve 4.",
                expected_impact="Stabilizes truck cycle times and avoids 180 T/day haulage speed degradation.",
                expected_recovery_tonnes=180.0,
                priority="HIGH",
                status="In Progress",
                confidence=88,
                created_time="25 mins ago"
            ),
            Recommendation(
                id="REC-003",
                mine_id="BALAGHAT-01",
                category="Blast Optimization",
                title="Reschedule Primary Round Firing to Shift Changeover Window",
                issue="Blast clearance overlap with production tramming",
                cause="Extended post-blast noxious gas clearance and bench safety verification delays",
                action="Shift primary round firing to shift changeover window (17:45 - 18:15). Verify blast hole stemming depth meets 1.8m minimum.",
                expected_impact="Eliminates 2.5 hr mid-shift production downtime and recovers 140 T/day from blast re-sequencing.",
                expected_recovery_tonnes=140.0,
                priority="MEDIUM",
                status="Under Review",
                confidence=85,
                created_time="45 mins ago"
            ),
            Recommendation(
                id="REC-004",
                mine_id="BALAGHAT-01",
                category="Crusher Maintenance",
                title="Schedule Pre-Emptive Crusher Mantle Liner Replacement During Low Throughput Window",
                issue="Crusher vibration telemetry nearing amber alert threshold (4.8 mm/s RMS vs 4.5 limit)",
                cause="Mantle wear at 78% of rated liner lifespan with progressive concave scoring",
                action="Schedule 4-hour maintenance shutdown between 02:00 and 06:00 during low truck arrival window. Utilize 4,800 T coarse ore stockpile buffer.",
                expected_impact="Prevents unplanned crusher outage that would halt 100% of processing for 8-12 hrs.",
                expected_recovery_tonnes=95.0,
                priority="MEDIUM",
                status="Scheduled",
                confidence=91,
                created_time="1 hr ago"
            ),
        ]
        db.add_all(recs)
        db.commit()

        print("Seeding Production Records (7-Day History)...")
        history = [
            Production(mine_id="BALAGHAT-01", production_date="2026-08-30", target_production=10000, actual_production=9850, predicted_production=9800, expected_shortfall=150, shortfall_percentage=1.5, rainfall=8, equipment_availability=92),
            Production(mine_id="BALAGHAT-01", production_date="2026-08-31", target_production=10000, actual_production=9620, predicted_production=9650, expected_shortfall=380, shortfall_percentage=3.8, rainfall=14, equipment_availability=89),
            Production(mine_id="BALAGHAT-01", production_date="2026-09-01", target_production=10000, actual_production=9400, predicted_production=9450, expected_shortfall=600, shortfall_percentage=6.0, rainfall=28, equipment_availability=86),
            Production(mine_id="BALAGHAT-01", production_date="2026-09-02", target_production=10000, actual_production=9280, predicted_production=9320, expected_shortfall=720, shortfall_percentage=7.2, rainfall=35, equipment_availability=85),
            Production(mine_id="BALAGHAT-01", production_date="2026-09-03", target_production=10000, actual_production=9100, predicted_production=9180, expected_shortfall=900, shortfall_percentage=9.0, rainfall=52, equipment_availability=81),
            Production(mine_id="BALAGHAT-01", production_date="2026-09-04", target_production=10000, actual_production=9120, predicted_production=9210, expected_shortfall=880, shortfall_percentage=8.8, rainfall=48, equipment_availability=82),
            Production(mine_id="BALAGHAT-01", production_date="2026-09-05", target_production=10000, actual_production=9150, predicted_production=9300, expected_shortfall=700, shortfall_percentage=7.0, rainfall=42, equipment_availability=84)
        ]
        db.add_all(history)
        db.commit()

        print("manganai.db seeded successfully with comprehensive MOIL data!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
