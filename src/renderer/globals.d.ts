/// <reference path="./gl/Physics/Physics" />
/// <reference path="./gl/World"/>




declare namespace Ammo {
    
    // Basics
    export class btVector3 {
        x(): number;
        y(): number;
        z(): number;
        constructor(x: number, y: number, z: number);
    }

    
    export class btQuaternion {
        x(): number;
        y(): number;
        z(): number;
        w(): number;
        constructor(x: number, y: number, z: number, w: number);
    }

    export class btTransform {
        setIdentity();
        setOrigin(v: btVector3);
        getOrigin(): btVector3;
        setRotation(q: btQuaternion);
        getRotation(): btQuaternion;
    }

    // World
    export class btDefaultCollisionConfiguration {}
    
    export class btCollisionDispatcher {
        constructor(c: btDefaultCollisionConfiguration);
    }

    export class btAxisSweep3 {
        constructor(min: btVector3, max: btVector3);
    }

    export class btSequentialImpulseConstraintSolver {}

    export class btDiscreteDynamicsWorld {
        constructor(a: btCollisionDispatcher, b: btAxisSweep3, c: btSequentialImpulseConstraintSolver, d: btDefaultCollisionConfiguration);
        setGravity(v: btVector3);
        addRigidBody(b: btRigidBody);
        removeRigidBody(b : btRigidBody);
        addRigidBody(b: btRigidBody, groupMask: Number, collisionMask: Number);
        stepSimulation(n1: number, n2: number);
        addConstraint(constraint: btTypedConstraint);
        removeConstraint(constriant: btTypedConstraint);
    }

    // Shapes
    export class btCollisionShape {
        calculateLocalInertia(n: number, v: btVector3);
        setMargin(n: number);
    }

    export class btConvexShape extends btCollisionShape {

    }

    export class btBoxShape extends btConvexShape {
        constructor(v: btVector3);
    }

    export class btSphereShape extends btConvexShape {
        constructor(radius: number);
    }

    export class btTriangleMesh {
        addTriangle(vertex0: btVector3, vertex1: btVector3, vertex2: btVector3, removeDuplicateVertices: boolean);
    }

    export class btConvexTriangleMeshShape extends btConvexShape {
        constructor(triMesh: btTriangleMesh, calcAabb:bool);
    }

    export class btCompoundShape {
        addChildShape(localTransform: btTransform, shape: btCollisionShape);
    }


    // Rigidbody
    export class btMotionState {
        getWorldTransform(out: btTransform): void;
    }

    export class btDefaultMotionState extends btMotionState {
        constructor(t: btTransform);
    }

    export class btRigidBody {
        constructor(info: btRigidBodyConstructionInfo);
        setActivationState(s: number);
        applyCentralForce (force: btVector3);
        getMotionState(): btMotionState;
        setCollisionFlags(flags: Number): void;
        setLinearVelocity(velocity: btVector3): void;
        setAngularVelocity(velocity: btVector3): void;
        setMassProps(mass: number, inertia: btVector3): void;
        updateInertiaTensor(): void;

    }

    export class btRigidBodyConstructionInfo {
        constructor(mass: number, motionState: btDefaultMotionState, shape: btConvexShape, inertia: btVector3);
        set_m_friction(val: number): void;
        set_m_restitution(val: number): void;
    }


    // Constraints
    export class btTypedConstraint {

    }

    export class btPoint2PointConstraint extends btTypedConstraint{
        constructor(rigidBodyA: btRigidBody, rigidBodyB: btRigidBody, pivotA: btVector3, pivotB: btVector3);
    }

    export class btGeneric6DofSpring2Constraint extends btTypedConstraint {
        constructor(rigidBodyA: btRigidBody, rigidBodyB: btRigidBody, frameA: btTransform, frameB: btTransform, useLinearReferenceFrameA: boolean);
        setLinearLowerLimit(linearLower: btVector3) : void
        setLinearUpperLimit(linearUpper: btVector3) : void
        setAngularLowerLimit(angularLower: btVector3) : void
        setAngularUpperLimit(angularUpper: btVector3) : void
    }

    export function destroy(object: any): any;
}

declare var logErr: any;
declare var Ammo: Ammo;
declare var AMM: any;