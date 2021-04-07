import { add, cross, dot, scale, subtract } from "./vec3.js";
export function ray_intersect_aabb(colliders, origin, direction) {
    let nearest_t = Infinity;
    let nearest_i = null;
    for (let i = 0; i < colliders.length; i++) {
        let t = intersection_time(origin, direction, colliders[i]);
        if (0 < t && t < nearest_t) {
            // Find the smallest positive t.
            nearest_t = t;
            nearest_i = i;
        }
    }
    if (nearest_i !== null) {
        let intersection = [0, 0, 0];
        scale(intersection, direction, nearest_t);
        add(intersection, intersection, origin);
        return { Collider: colliders[nearest_i], Point: intersection };
    }
    return null;
}
function intersection_time(origin, direction, aabb) {
    let max_lo = -Infinity;
    let min_hi = +Infinity;
    for (let i = 0; i < 3; i++) {
        let lo = (aabb.Min[i] - origin[i]) / direction[i];
        let hi = (aabb.Max[i] - origin[i]) / direction[i];
        if (lo > hi) {
            [lo, hi] = [hi, lo];
        }
        if (hi < max_lo || lo > min_hi) {
            return Infinity;
        }
        if (lo > max_lo)
            max_lo = lo;
        if (hi < min_hi)
            min_hi = hi;
    }
    return max_lo > min_hi ? Infinity : max_lo;
}
let K = [0, 0, 0];
let L = [0, 0, 0];
let M = [0, 0, 0];
let E = [0, 0, 0];
let F = [0, 0, 0];
let G = [0, 0, 0];
let N = [0, 0, 0];
// Based on https://www.codeproject.com/Articles/625787/Pick-Selection-with-OpenGL-and-OpenCL
export function ray_intersect_mesh(mesh, origin, direction) {
    let tri_count = mesh.IndexCount / 3;
    for (let tri = 0; tri < tri_count; tri++) {
        let i1 = mesh.IndexArray[tri * 3 + 0] * 3;
        let i2 = mesh.IndexArray[tri * 3 + 1] * 3;
        let i3 = mesh.IndexArray[tri * 3 + 2] * 3;
        K[0] = mesh.VertexArray[i1 + 0];
        K[1] = mesh.VertexArray[i1 + 1];
        K[2] = mesh.VertexArray[i1 + 2];
        L[0] = mesh.VertexArray[i2 + 0];
        L[1] = mesh.VertexArray[i2 + 1];
        L[2] = mesh.VertexArray[i2 + 2];
        M[0] = mesh.VertexArray[i3 + 0];
        M[1] = mesh.VertexArray[i3 + 1];
        M[2] = mesh.VertexArray[i3 + 2];
        // O + tD = kK + lL + mM
        // O + tD = kK + lL + (1 - k - l)M
        // O + tD = kK + lL + M - kM - lM
        // O + tD = k(K - M) + l(L - M) + M
        // O - M = k(K - M) + l(L - M) - tD
        // G = kE + lF - tD
        // Two edges of the tri: E, F.
        subtract(E, K, M);
        subtract(F, L, M);
        // The third "edge" between M and the ray's origin: G.
        subtract(G, origin, M);
        // From now on, M is used as a temporary Vec3.
        // Given the linear system of equations:
        //     kE + lF - tD = G
        // Given the Cramer's Rule for solving the system using determinants:
        //     k = |G F -D| / |E F -D|
        //     l = |E G -D| / |E F -D|
        //     t = |E F  G| / |E F -D|
        // Given the determinant as the triple product:
        //     |A B C| = A·(B×C) = B·(C×A) = C·(A×B)
        // Given that we can invert the sign by switching the order of the cross product:
        //     |A B C| = A·(B×C) = -A·(C×B)
        // We arrive at:
        //     k = D·(F×G) / D·(F×E)
        //     l = D·(G×E) / D·(F×E)
        //     t = G·(E×F) / D·(F×E)
        cross(N, F, E);
        let denominator = dot(direction, N);
        if (denominator >= 0) {
            // The tri's normal and the ray's direction are too similar.
            // The ray would intersect the tri from the back side.
            continue;
        }
        // k = D·(F×G) / D·(F×G). Don't divide by D·(F×G) to save cycles, and
        // flip the comparison to emulate the negative denomiator.
        let k = dot(direction, cross(M, F, G));
        if (k > 0) {
            // Barycentric coordinate < 0, no intersection.
            continue;
        }
        // l = D·(G×E) / D·(F×G). Don't divide by D·(F×G) to save cycles, and
        // flip the comparison to emulate the negative denomiator.
        let l = dot(direction, cross(M, G, E));
        if (l > 0) {
            // Barycentric coordinate < 0, no intersection.
            continue;
        }
        // m = 1 - k - l when k and l are divided by the denominator.
        let m = denominator - k - l;
        if (m > 0) {
            // Barycentric coordinate < 0, no intersection.
            continue;
        }
        // t = G·(E×F) / D·(F×G)
        // G·(E×F) = -G·(F×E) = -G·N
        let t = -dot(G, N) / denominator;
        // Intersection is O + tD.
        let intersection = [0, 0, 0];
        scale(intersection, direction, t);
        add(intersection, intersection, origin);
        return { TriIndex: tri, Point: intersection };
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF5Y2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJheWNhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFRM0QsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixTQUFzQixFQUN0QixNQUFZLEVBQ1osU0FBZTtJQUVmLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUN6QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsRUFBRTtZQUN4QixnQ0FBZ0M7WUFDaEMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNkLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUVELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtRQUNwQixJQUFJLFlBQVksR0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQyxDQUFDO0tBQ2hFO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMs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