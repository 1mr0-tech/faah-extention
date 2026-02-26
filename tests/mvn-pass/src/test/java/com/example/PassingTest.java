package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class PassingTest {

    @Test
    public void addition() {
        assertEquals(2, 1 + 1);
    }

    @Test
    public void stringEquality() {
        assertEquals("faah", "faah");
    }

    @Test
    public void arrayLength() {
        int[] arr = {1, 2, 3};
        assertEquals(3, arr.length);
    }

    @Test
    public void booleanTrue() {
        assertTrue(true);
    }

    @Test
    public void nullCheck() {
        assertNotNull("faah");
    }
}
