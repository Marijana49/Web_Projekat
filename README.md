# Travel Planner App

Travel planning web application — manage plans, destinations, activities, view activities on interactive map, expenses, checklist and share plan via QR code.

**System Architecture**

The system is organized as a microservice architecture implemented on the Microsoft Service Fabric platform, with three separate services:

    AuthService - stateless, registration, login, JWT tokens, user management, presistence: SQL Server

    TravelService - stateless, travel plans, destinations, activities, expenses, checklist, budget, validate share token. Persistence: SQL Server

    SharingService - statefull, generation and Validation of Plan Share Token (QR Code). Persistence: Service Fabric Reliable Collections

Frontend is developed in React (Vite), communicates with backend services via REST API.


**Prerequisites**:

    -Windows 10/11

    -Visual Studio 2022

    -.NET SDK 8

    -Service Fabric SDK i Runtime

    -SQL Server 

    -Node.js and npm

**Database conection**

1.Open appsettings.json in each backend service (AuthService, TravelService) and check the connection string:

    "ConnectionStrings": {
         "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TravelPlannerDb;Trusted_Connection=True;"
    }

This needs to be done separately for AuthService and TravelService, as each has its own base/schema.

2.Run migrations for each service (from the Package Manager Console in Visual Studio, with the appropriate project selected):   

    Update-Database

**Starting the backend service (Service Fabric)**

1. Open the .sln file of the backend solution in Visual Studio.

2. Set Backend (Service Fabric Application project) as Startup Project.

3. Make sure the appropriate Publish Profile is selected — for local launch use PublishProfiles/Local.1Node.xml or Local.5Node.xml.

4. Start the Service Fabric Local Cluster Manager (icon in the system tray) and make sure the local cluster is running. If not, right click → Start Local Cluster.

5. Press F5 (or Debug → Start Debugging) to build and deploy the application to the local cluster.

6. Wait for the deployment to finish — the status "Deploy: 1 succeeded" in the Output window confirms a successful deployment.

7. Open Service Fabric Explorer at http://localhost:19080/Explorer to check that all services (AuthService, TravelService, SharingService) are in Ready state.

**Backend service ports**

    AuthService - 8272

    TravelService - 8958

    SharingService - 8504

    Service Fabric Explorer - 19080

**Starting the frontend application**

1. Position in the frontend project folder:

        cd travel-planner-frontend

2. Install dependencies:

       npm install


4. Create the .env file in the root of the frontend project:

        VITE_AUTH_PORT=8272

        VITE_TRAVEL_PORT=8958

        VITE_SHARING_PORT=8504

        VITE_FRONTEND_PORT=5173

5. Start the dev server:

        npm run dev


If you want the application to be available to other devices on the same network (e.g. to test the QR code from the phone), run it with the --host option:

    npm run dev -- --host

5. Open in the browser the address that is printed in the terminal


**Testing plan sharing (QR code) from a mobile device**

To make the plan sharing feature work from another device (eg mobile phone) on the same local network:

1. Start the frontend with the --host option 

2. Make sure your computer and mobile device are connected to the same Wi-Fi network

3. Check that Windows Firewall allows incoming connections on ports 5173, 8272, 8504, 8958

4. Open the application from a computer using the local network IP address (eg http://192.168.1.x:5173), log in, create/open a plan and generate a QR code to share.

5. Scan the generated QR code with your mobile phone — the link will automatically use your computer's current network address.


**User roles**

    USER - create and manage travel plans
    ADMIN - in addition to standard authorizations, manages user accounts (list, delete, change role)

**Share plan via QR code — access levels**

    VIEW - allows viewing the plan without the need to log in
    EDIT - enables modification of plan content (destinations, activities, basic data); requires logging in to an existing user account

The sharing token has a lifetime (7 days by default) and can be revoked at any time by the plan owner.


    ├── Backend/                    # Service Fabric Application (SF manifest, publish profili)
    │   ├── AuthService/
    │   ├── TravelService/
    │   └── SharingService/
    ├── docs                        # Use Case Diagram, System Architecture Diagram
    ├── Data/                       # Models, DTOs, Enums, DbContext, Migrations
    └── travel-planner-frontend/    # React (Vite) frontend 


The plan owner can generate a PDF report with plan details.


**Interactive map**

Activity locations are automatically geocoded (converted from address to map 
coordinates) using the free OpenStreetMap Nominatim API — no API key required.

- Requires outbound internet access from the TravelService backend to 
  nominatim.openstreetmap.org
- If an address cannot be resolved (e.g. misspelled or too vague), the 
  activity is still saved, but won't appear on the map


The map displays numbered markers for each activity (in visit order) 
   connected by a route line.
   
Frontend map rendering uses react-leaflet and leaflet


        npm install react-leaflet leaflet
