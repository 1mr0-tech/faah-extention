package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class FailingTest {

    @Test
    public void thisPasses() {
        assertEquals(2, 1 + 1);
    }

    @Test
    public void thisFails() {
        // This assertion always fails — triggers faah sound via mvn test exit code
        assertEquals("expected value", "actual value");
    }

    @Test
    public void thisThrows() {
        throw new RuntimeException("Simulated production error");
    }
}
